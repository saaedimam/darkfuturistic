#!/usr/bin/env node

const pa11y = require('pa11y')
const fs = require('fs/promises')
const path = require('path')

const urls = [
  'http://localhost:3000',
  'http://localhost:3000/blog',
  'http://localhost:3000/blog/example-post',
]

async function runA11yTests() {
  console.log('🔍 Running accessibility tests...\n')
  
  const results = []
  
  for (const url of urls) {
    try {
      console.log(`Testing: ${url}`)
      
      const result = await pa11y(url, {
        standard: 'WCAG2AA',
        includeNotices: false,
        includeWarnings: true,
        chromeLaunchConfig: {
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      })
      
      results.push({
        url,
        issues: result.issues.length,
        details: result.issues
      })
      
      if (result.issues.length === 0) {
        console.log('✅ No accessibility issues found')
      } else {
        console.log(`❌ Found ${result.issues.length} accessibility issues`)
        result.issues.forEach(issue => {
          console.log(`   - ${issue.type}: ${issue.message}`)
        })
      }
      console.log('')
      
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message)
    }
  }
  
  // Save results to file
  const reportPath = path.join(process.cwd(), 'reports', 'a11y-report.json')
  await fs.mkdir(path.dirname(reportPath), { recursive: true })
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2))
  
  console.log(`📊 Full report saved to: ${reportPath}`)
  
  // Exit with error code if issues found
  const totalIssues = results.reduce((sum, result) => sum + result.issues, 0)
  if (totalIssues > 0) {
    console.log(`\n❌ Total accessibility issues: ${totalIssues}`)
    process.exit(1)
  } else {
    console.log('\n✅ All accessibility tests passed!')
  }
}

runA11yTests().catch(console.error)