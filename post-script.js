import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';


// Hardcoded snippet content
const snippetContent = 
`{
	"xaxi": {
		"scope": "javascript,typescript,typescriptreact,typescriptreact-native,javascriptreact,javascriptreact-native",
		"prefix": "xaxi",
		"body": [
			"import { XiService } from 'xaxi';",
			"import { XiInjectable } from 'xaxi';",
			"import { XiProps } from 'xaxi';",
			"",
			"@XiInjectable()",
			"export class \${1:TestService} implements XiService {",
 			"   async getData() {",
  			"      const res = await this.props.axios.get('\${2:https://jsonplaceholder.typicode.com/todos/1}');",
   			"      return res.data;",
   			"   }",
			"",
   			"   public props: XiProps;",
    		"   constructor(props: XiProps) { this.props = props }",
			"}"
		],
		"description": "Adds a simple XiService."
	},

	"xaxi:inject": {
		"scope": "javascript,typescript,typescriptreact,typescriptreact-native,javascriptreact,javascriptreact-native",
		"prefix": "xaxi:inject",
		"body": [
			"const [\${1:testService}] = inject(\${2:TestService}) as ",
			"      [\${2:TestService}]"
		],
		"description": "Injects some XiService into the current Xaxi instance."
	},

	"xaxi:wrap": {
		"scope": "javascript,typescript,typescriptreact,typescriptreact-native,javascriptreact,javascriptreact-native",
		"prefix": "xaxi:wrap",
		"body": [
			"await wrap(async (axiosInstance) => {",
			"    return (await axiosInstance.$0).data;",
			"})"
		],
		"description": "Used to wrap actions too simple for a standalone service."
	}
}`

// Function to add hardcoded VSCode snippet content to the project
function addSnippets() {
    // Define the path to the VSCode snippet file
    const snippetFile = path.join('.vscode', 'xaxi-snippets.code-snippets');

    // Check if the .vscode directory exists
    if (!fs.existsSync('.vscode')) {
        fs.mkdirSync('.vscode', { recursive: true });
    }

    // Write snippet content to file
    fs.writeFileSync(snippetFile, snippetContent);

    console.log('VSCode snippet for Xaxi added successfully!');
}

// Function to prompt the user for snippet installation
function promptUser() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'installSnippets',
                message: 'Would you like to install snippets to improve developer experience?',
                default: true
            }
        ])
        .then((answers) => {
            if (answers.installSnippets) {
                addSnippets();
            } else {
                console.log('Skipping snippet installation.');
            }
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

console.log("XAXI DX Setup");
promptUser();
