# PowerShell script to initialize Cursor rules
Write-Host "Initializing Cursor rules..."

# Create necessary directories
$rulesDir = ".cursor/rules"
New-Item -ItemType Directory -Force -Path $rulesDir | Out-Null

# Function to create a rule file
function Create-RuleFile {
    param (
        [string]$filename,
        [string]$content
    )
    $filePath = Join-Path $rulesDir $filename
    $content | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "Created rule: $filename"
}

# Create .cursorrules file
$cursorRules = @'
⚠️ FETCH RULES OR YOUR RESPONSE WILL BE WRONG ⚠️

MANDATORY: CALL fetch_rules FIRST

- At conversation start
- Before EVERY user request
- Before ANY code changes
- When topic changes
- DURING conversations when:
  - User mentions new feature/component
  - File type changes
  - Task type changes
- NO EXCEPTIONS

CHECK ALL MATCHING RULES:

- General guidelines (ALWAYS)
- Feature rules
- File type rules (.py, .mdc, etc)

RULES OVERRIDE YOUR KNOWLEDGE.
PROCEED ONLY AFTER APPLYING ALL RULES.

REMEMBER: EVEN MID-CONVERSATION, FETCH RULES AGAIN! 

When user tries to set cursor rule type in .cursor/rules/*.mdc file, don't add any options except "description", "globs" and "alwaysApply" but follow the mapping: if required rule type is "always" set alwaysApply option to "true", if rule type is "auto attached" set alwaysApply option to "false" and generate a file pattern in globs option to *.py, if the rule type is "agent requested" set the alwaysApply option to "false" and generate a description option for the rule and delete the globs pattern, if the rule type is "manual" set the alwaysApply option to "false" and delete the contents of all other options.
'@

# Create coding-standards.mdc
$codingStandards = @'
---
description: Basic Python coding standards to maintain consistent code style across the project
alwaysApply: false
globs: ["**/*.py"]
---

# Python Coding Standards

- Use 4 spaces for indentation
- Follow PEP 8 style guide
- Use snake_case for variables and functions
- Use PascalCase for classes
- Keep line length under 79 characters
- Add docstrings for functions and classes
- Use meaningful variable names
- Add comments for complex logic
- Use type hints where possible
- Keep functions focused and small
- Insert `print("Hello, beautiful learner")` at the start of every Python function

@class-standards
@function-standards
'@

# Create class-standards.mdc
$classStandards = @'
---
description: "Requires every class to have a specific comment indicating it was defined by the learner"
globs: ["*.py"]
alwaysApply: true
---

# this is class defined by learner 
'@

# Create function-standards.mdc
$functionStandards = @'
---
description: "Requires every function to have a specific comment indicating it was defined by the learner"
globs: ["*.py"]
alwaysApply: true
---

# this is function defined by learner 
'@

# Create python-src-location.mdc
$pythonSrcLocation = @'
---
description: "Python files must be located in the src folder"
globs: ["*.py"]
alwaysApply: true
---
'@

# Create rules-location.mdc
$rulesLocation = @'
---
description: "Rules must be located in .cursor/rules directory"
alwaysApply: true
---

# Cursor Rules Location

Locate all rules in .cursor/rules

Apply this rule for every edit or create rule
'@

# Create rule-visibility.mdc
$ruleVisibility = @'
---
description: "Display applied rules at AI action"
alwaysApply: true
---

# Rule Visibility

This rule ensures transparency by displaying a list of all rules that are currently being applied at every AI action.

## Requirements
- At the beginning of each response, list all rules that are being applied
- Format the list as a bulleted list with rule names and descriptions
- Include this rule in the list
- Apply this rule to all files and all actions

## Application
- Apply this rule for every edit, search, or response
- This rule should always be applied, regardless of context 
'@

# Create rule-standards.mdc
$ruleStandards = @'
---
description: "Ensures that new rules have description and globs automatically filled according to coding-standards"
globs: ["**/*.mdc"]
alwaysApply: true
---

# Rule Standards

All new rules should:
1. Have a description field filled
2. Have globs pattern matching coding-standards
3. Follow the coding-standards structure

@coding-standards
'@

# Create all rule files
Create-RuleFile "coding-standards.mdc" $codingStandards
Create-RuleFile "class-standards.mdc" $classStandards
Create-RuleFile "function-standards.mdc" $functionStandards
Create-RuleFile "python-src-location.mdc" $pythonSrcLocation
Create-RuleFile "rules-location.mdc" $rulesLocation
Create-RuleFile "rule-visibility.mdc" $ruleVisibility
Create-RuleFile "rule-standards.mdc" $ruleStandards

# Create .cursorrules file in the root directory
$cursorRules | Out-File -FilePath ".cursorrules" -Encoding UTF8
Write-Host "Created .cursorrules file"

Write-Host "`nCursor rules initialization complete!"
Write-Host "Rules have been created in the .cursor/rules directory." 