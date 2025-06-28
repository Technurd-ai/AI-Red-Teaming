
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the JWT token
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    const { targetUrl, scanType, attackTemplates } = await req.json()

    console.log(`Starting security scan for user ${user.id}`)
    console.log(`Target: ${targetUrl}, Type: ${scanType}`)

    // Create a new security scan record
    const { data: scanData, error: scanError } = await supabaseClient
      .from('security_scans')
      .insert({
        user_id: user.id,
        target_url: targetUrl,
        scan_type: scanType,
        status: 'running',
        progress: 0
      })
      .select()
      .single()

    if (scanError) {
      console.error('Error creating scan:', scanError)
      return new Response(
        JSON.stringify({ error: 'Failed to create scan' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Simulate security scanning process
    const scanResults = await performSecurityScan(targetUrl, scanType, attackTemplates, supabaseClient, scanData.id)

    // Update scan with results
    const { error: updateError } = await supabaseClient
      .from('security_scans')
      .update({
        status: 'completed',
        progress: 100,
        results: scanResults,
        vulnerabilities_found: scanResults.vulnerabilities?.length || 0,
        security_score: calculateSecurityScore(scanResults),
        completed_at: new Date().toISOString()
      })
      .eq('id', scanData.id)

    if (updateError) {
      console.error('Error updating scan:', updateError)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Security scan completed successfully',
        scanId: scanData.id,
        results: scanResults
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in security-scan function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function performSecurityScan(targetUrl: string, scanType: string, attackTemplates: any[], supabaseClient: any, scanId: string) {
  console.log(`Performing ${scanType} scan on ${targetUrl}`)
  
  const vulnerabilities = []
  const testResults = []

  // Simulate different types of scans
  for (let i = 0; i < attackTemplates.length; i++) {
    const template = attackTemplates[i]
    
    // Update progress
    const progress = Math.round(((i + 1) / attackTemplates.length) * 100)
    await supabaseClient
      .from('security_scans')
      .update({ progress })
      .eq('id', scanId)

    // Simulate attack execution
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate processing time

    // Randomly determine if vulnerability is found (for demo purposes)
    const isVulnerable = Math.random() > 0.6

    const testResult = {
      template: template.name,
      category: template.category,
      payload: template.payload,
      vulnerable: isVulnerable,
      response: isVulnerable ? 'Vulnerability detected - system responded inappropriately' : 'System handled request safely',
      timestamp: new Date().toISOString()
    }

    testResults.push(testResult)

    if (isVulnerable) {
      const vulnerability = {
        type: template.category,
        severity: template.severity,
        description: `${template.name}: ${template.description}`,
        payload: template.payload,
        evidence: testResult.response
      }
      
      vulnerabilities.push(vulnerability)

      // Create threat alert
      await supabaseClient
        .from('threat_alerts')
        .insert({
          scan_id: scanId,
          alert_type: template.category,
          severity: template.severity,
          description: vulnerability.description,
          payload: template.payload,
          source: targetUrl
        })
    }
  }

  return {
    scanType,
    targetUrl,
    vulnerabilities,
    testResults,
    summary: {
      totalTests: attackTemplates.length,
      vulnerabilitiesFound: vulnerabilities.length,
      criticalIssues: vulnerabilities.filter(v => v.severity === 'critical').length,
      highIssues: vulnerabilities.filter(v => v.severity === 'high').length,
      mediumIssues: vulnerabilities.filter(v => v.severity === 'medium').length,
      lowIssues: vulnerabilities.filter(v => v.severity === 'low').length
    }
  }
}

function calculateSecurityScore(results: any): number {
  const { vulnerabilities } = results
  if (!vulnerabilities || vulnerabilities.length === 0) return 100

  let penaltyPoints = 0
  vulnerabilities.forEach((vuln: any) => {
    switch (vuln.severity) {
      case 'critical': penaltyPoints += 25; break
      case 'high': penaltyPoints += 15; break
      case 'medium': penaltyPoints += 8; break
      case 'low': penaltyPoints += 3; break
    }
  })

  return Math.max(0, 100 - penaltyPoints)
}
