{
  "nodes": [
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "owner",
              "value": "mckaywrigley"
            },
            {
              "name": "repo",
              "value": "mckays-app-template"
            },
            {
              "name": "branch",
              "value": "main"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [
        -1120,
        -1000
      ],
      "id": "b0524ba5-f26a-45a4-b780-6c71d32eba87",
      "name": "Repo Info1"
    },
    {
      "parameters": {
        "url": "={{ 'https://api.github.com/repos/' + $json[\"owner\"] + '/' + $json[\"repo\"] + '/git/trees/' + $json[\"branch\"] + '?recursive=1' }}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [
        -940,
        -1000
      ],
      "id": "d5132117-40bf-438e-a831-603315602fac",
      "name": "Get Repo File List1"
    },
    {
      "parameters": {
        "functionCode": "const tree = $json.tree;\nconst files = tree.filter(item => item.type === 'blob');\nreturn files.map(file => ({ json: { path: file.path, url: file.url } }));"
      },
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        -760,
        -1000
      ],
      "id": "01d1b0d2-888c-488f-9c15-0c167966be32",
      "name": "Prepare File List1"
    },
    {
      "parameters": {
        "url": "={{ $json[\"url\"] }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "githubApi",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [
        -120,
        -920
      ],
      "id": "42ec15a1-dc0f-403b-a669-662f5f4ef347",
      "name": "Get File Content1",
      "credentials": {
        "githubApi": {
          "id": "BaA7gUC3e51vNenO",
          "name": "GitHub account"
        }
      }
    },
    {
      "parameters": {
        "functionCode": "const contentItems = items;\nconst fileItems = $(\"Prepare File List\").all();\nlet combinedText = \"\";\nfor (let i = 0; i < contentItems.length; i++) {\n  const filePath = fileItems[i].json.path;\n  const fileContentBase64 = contentItems[i].json.content;\n  const fileContent = Buffer.from(fileContentBase64, 'base64').toString('utf8');\n  combinedText += `File: ${filePath}\\n${fileContent}\\n\\n`;\n}\nreturn [{ json: { combinedText } }];"
      },
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        60,
        -920
      ],
      "id": "5db35ae1-b6b0-4829-8490-68815eaaf3f3",
      "name": "Combine File Contents2"
    },
    {
      "parameters": {
        "authentication": "oAuth2",
        "operation": "update",
        "documentURL": "https://docs.google.com/document/d/1z0_qoScw6UDXvBqRJ709-_jLMN15lpYC1a24cgKMFLY/edit?tab=t.814lds8bgluw",
        "actionsUi": {
          "actionFields": [
            {
              "action": "insert",
              "text": "={{ $json.combinedText }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.googleDocs",
      "typeVersion": 1,
      "position": [
        260,
        -920
      ],
      "id": "d99038bf-fd6a-4d93-a909-665077448b73",
      "name": "Update Google Doc2",
      "credentials": {
        "googleDocsOAuth2Api": {
          "id": "WCewfgdCJyazfryb",
          "name": "Google Docs account 3"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose",
            "version": 2
          },
          "conditions": [
            {
              "id": "5048aa2c-1eb5-49e6-8389-96ed0f285a99",
              "leftValue": "={{ $json.path }}",
              "rightValue": "node_modules",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "142c50d4-8790-4133-bbcc-eaac2dff2590",
              "leftValue": "={{ $json.path }}",
              "rightValue": "dist",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "a5e24f74-afd2-48cd-a92b-99f29b64882f",
              "leftValue": "={{ $json.path }}",
              "rightValue": ".next",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "07b5e5f1-b0d8-4963-b3c3-eaeeabe97bfc",
              "leftValue": "={{ $json.path }}",
              "rightValue": ".png",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "edc9ef70-5e4b-43f2-a62c-a2f9dcec4aaa",
              "leftValue": "={{ $json.path }}",
              "rightValue": ".jpg",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "96f96bf1-63f9-4566-86a9-c5bb8d3032eb",
              "leftValue": "={{ $json.path }}",
              "rightValue": ".jpeg",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "2447af07-4bd7-45c4-8e93-2f142a732897",
              "leftValue": "={{ $json.path }}",
              "rightValue": ".mp4",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "6879455d-5bf3-4156-9c06-376d8b3d985c",
              "leftValue": "={{ $json.path }}",
              "rightValue": "prettier.config.cjs",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "f20ea9e4-9a3f-4eec-b2e4-a585d5c34acb",
              "leftValue": "={{ $json.path }}",
              "rightValue": "tailwind.config.ts",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            },
            {
              "id": "206d8b60-8892-4403-bbf4-8ef4140ed20f",
              "leftValue": "={{ $json.path }}",
              "rightValue": "package-lock.json",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            }
          ],
          "combinator": "or"
        },
        "looseTypeValidation": true,
        "options": {
          "ignoreCase": true
        }
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -600,
        -1000
      ],
      "id": "2547fd6a-54bb-4f52-8527-2dccdf7c0dd3",
      "name": "If"
    },
    {
      "parameters": {
        "batchSize": 10,
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        -360,
        -980
      ],
      "id": "54577bd7-c695-4e44-9817-aa40a65ea7fa",
      "name": "Loop Over Items"
    }
  ],
  "connections": {
    "Repo Info1": {
      "main": [
        [
          {
            "node": "Get Repo File List1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Repo File List1": {
      "main": [
        [
          {
            "node": "Prepare File List1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare File List1": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get File Content1": {
      "main": [
        [
          {
            "node": "Combine File Contents2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Combine File Contents2": {
      "main": [
        [
          {
            "node": "Update Google Doc2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Update Google Doc2": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [],
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [],
        [
          {
            "node": "Get File Content1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "e058277b3889e662c0ecb8bbca31e6bd17a0f766cdb13829287c2832aa9bc9fc"
  }
}
