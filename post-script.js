const fs = require("fs-extra");
const readline = require("readline");


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

function install() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Prompt user for snippet installation
  rl.question(
    "Would you like to install snippets to improve developer experience? (y/n): ",
    function (answer) {
      if (answer.toLowerCase() === "y") {
        addSnippets();
      } else {
        console.log("Skipping snippet installation.");
        rl.close();
      }
    }
  );

  rl.on("close", function () {
    process.exit(0);
  });
}

function addSnippets() {
  // Define the path to the VSCode snippet file
  const snippetFile = ".vscode/xaxi-snippet.code-snippets";
  
  // Check if the .vscode directory exists
  if (!fs.existsSync(".vscode")) {
    fs.mkdirSync(".vscode");
  }

  // Write snippet content to file
  fs.writeFileSync(snippetFile, snippetContent);

  console.log("VSCode snippets added successfully!");
}

// Called on the command line
if (require.main === module) {
  install();
}
