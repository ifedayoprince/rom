# Function to add hardcoded VSCode snippet content to the project
function Add-Snippets {
  # Define the path to the VSCode snippet file
  $snippetFile = ".vscode\snippets\my-snippets.code-snippets"
  
  # Check if the .vscode directory exists
  if (!(Test-Path -Path ".vscode" -PathType Container)) {
    New-Item -ItemType Directory -Path ".vscode"
  }
  
  # Hardcoded snippet content
  @"
{
  "Print to console": {
    "prefix": "log",
    "body": [
      "console.log('$1');",
      "$2"
    ],
    "description": "Log output to console"
  }
}
"@ | Out-File -FilePath $snippetFile
  
  Write-Output "VSCode snippets added successfully!"
}

# Function to prompt the user for snippet installation
function Prompt-User {
  $installSnippets = Read-Host "Would you like to install snippets to improve developer experience? (y/n)"
  
  switch ($installSnippets.ToLower()) {
    "y" {
      Add-Snippets
      break
    }
    "n" {
      Write-Output "Skipping snippet installation."
      break
    }
    default {
      Write-Output "Invalid input. Please enter 'y' or 'n'."
      Prompt-User
      break
    }
  }
}

# Call the prompt_user function
Prompt-User
