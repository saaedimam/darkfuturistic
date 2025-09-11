#!/usr/bin/env node

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs/promises')
const path = require('path')

const urls = [
  'http://localhost:3000',
  'http://localhost:3000/blog',
]

const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'first-input-delay',
      'total-blocking-time',
      'speed-index',
      'interactive',
    ],
  },
}

const budgets = {
  'largest-contentful-paint': 1800, // 1.8s
  'cumulative-layout-shift': 0.05,  // < 0.05
  'total-blocking-time': 200,       // < 200ms
  'first-contentful-paint': 1200,   // < 1.2s
}

async function runLighthouseTests() {
  console.log('🚀 Running Lighthouse performance tests...\n')
  
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  const results = []
  
  for (const url of urls) {
    try {
      console.log(`Testing: ${url}`)
      
      const runnerResult = await lighthouse(url, {
        port: chrome.port,
        disableDeviceEmulation: false,
        emulatedFormFactor: 'desktop',
      }, config)
      
      const { lhr } = runnerResult
      const audits = lhr.audits
      
      const metrics = {
        url,
        'first-contentful-paint': Math.round(audits['first-contentful-paint'].numericValue),
        'largest-contentful-paint': Math.round(audits['largest-contentful-paint'].numericValue),
        'cumulative-layout-shift': Math.round(audits['cumulative-layout-shift'].numericValue * 1000) / 1000,
        'total-blocking-time': Math.round(audits['total-blocking-time'].numericValue),
        'speed-index': Math.round(audits['speed-index'].numericValue),
        'interactive': Math.round(audits['interactive'].numericValue),
      }
      
      results.push(metrics)
      
      // Check against budgets
      let passed = true
      for (const [metric, value] of Object.entries(metrics)) {
        if (metric === 'url') continue
        
        const budget = budgets[metric]
        if (budget && value > budget) {
          console.log(`❌ ${metric}: ${value}ms (budget: ${budget}ms)`)
          passed = false
        } else if (budget) {
          console.log(`✅ ${metric}: ${value}ms (budget: ${budget}ms)`)
        } else {
          console.log(`ℹ️  ${metric}: ${value}ms`)
        }
      }
      
      console.log('')
      
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message)
    }
  }
  
  await chrome.kill()
  
  // Save results to file
  const reportPath = path.join(process.cwd(), 'reports', 'lighthouse-report.json')
  await fs.mkdir(path.dirname(reportPath), { recursive: true })
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2))
  
  console.log(`📊 Full report saved to: ${reportPath}`)
  
  // Check if any budgets were exceeded
  const failedTests = results.some(result => {
    return Object.entries(budgets).some(([metric, budget]) => {
      return result[metric] > budget
    })
  })
  
  if (failedTests) {
    console.log('\n❌ Some performance budgets were exceeded!')
    process.exit(1)
  } else {
    console.log('\n✅ All performance budgets passed!')
  }
}

runLighthouseTests().catch(console.error)