#!/usr/bin/env node

const pa11y = require('pa11y')
const chalk = require('chalk')

const testUrl = process.env.TEST_URL || 'http://localhost:3000'

async function runA11yTest() {
  console.log(chalk.blue('🔍 Running accessibility tests...'))
  console.log(chalk.gray(`Testing: ${testUrl}`))

  try {
    const results = await pa11y(testUrl, {
      standard: 'WCAG2AA',
      includeNotices: true,
      includeWarnings: true,
      runners: ['axe', 'htmlcs'],
      timeout: 30000,
      wait: 2000,
    })

    if (results.issues.length === 0) {
      console.log(chalk.green('✅ No accessibility issues found!'))
      process.exit(0)
    }

    console.log(chalk.red(`❌ Found ${results.issues.length} accessibility issues:`))
    console.log()

    results.issues.forEach((issue, index) => {
      console.log(chalk.yellow(`${index + 1}. ${issue.message}`))
      console.log(chalk.gray(`   Type: ${issue.type}`))
      console.log(chalk.gray(`   Code: ${issue.code}`))
      console.log(chalk.gray(`   Context: ${issue.context}`))
      console.log(chalk.gray(`   Selector: ${issue.selector}`))
      console.log()
    })

    // Exit with error code if there are issues
    process.exit(1)
  } catch (error) {
    console.error(chalk.red('❌ Error running accessibility tests:'))
    console.error(chalk.red(error.message))
    process.exit(1)
  }
}

runA11yTest()