<h1 align="center">
  Twilio Signal 2025 Keynote Demo<br>
  Conversation Relay + Azure Foundry
</h1>

# Demo Overview

This demo showcases a multi-agent, voice-based AI system using Twilio ConversationRelay, Azure OpenAI, Azure AI Search, and Azure Foundry. It implements the **Talker-Reasoner architecture** ([paper](https://arxiv.org/abs/2410.08328v1)), a pattern for building agentic voice systems.

- **Talker Agent**
  - Handles real-time voice interaction with the user
  - Focused on fluency, latency, and dialogue continuity
  - Delegates complex tasks to background processes or back-office agents

- **Subconscious Background Processes (Reasoners)**
  - Run in parallel without interrupting the user experience
  - Examples in this demo:
    - **Vector Memory:** Long-term memory retrieval via Azure AI Search (semantic vector index)
    - **Summarizer:** Monitors user sentiment and topics using lightweight LLM logic

- **Back-Office Agents**
  - Additional autonomous agents the Talker can query when needed
  - Built using Azure Foundry
  - Handle domain-specific reasoning and slower, computation-heavy tasks
  - Support a modular architecture without burdening the main conversational loop

### 🖥️ Dual UI

The demo includes a split-screen view of:

- **Frontend UI:** The user-facing voice interface powered by Twilio
- **Backend View:** Real-time agent orchestration, including background reasoning, memory queries, and inter-agent messaging

# Twilio Setup

1. Create API key and token and set `.env` file params `TWILIO_API_KEY` and `TWILIO_API_SECRET` respectively
2. Create Sync service and set `TWILIO_SYNC_SVC_SID` in _both_ the `.env` file and the `ui/.env` file
3. In the `.env.example` file, at the end are two mp3 files that need to be uploaded as Twilio assets, and their URLs set respectively
4. Set the `DEFAULT_TWILIO_NUMBER` to a number from your Twilio account that can make outbound calls
5. Set the `DEMO_USER_*` variables to your demo user
6. Assign an incoming number (can be the same as outbound)
   1. Set the Webhook to be `<YOUR_SERVER>/incoming-call`
   2. Set the Call status changes to be `<YOUR_SERVER>/call-status`

# Azure Setup

Most configuration will occur in the Azure AI Foundry or the Azure portal

### Azure

Create an Azure account and login to https://portal.azure.com/

Ensure you have an subscription, the transcript storage service uses Azure AI Search which is not available on the free tier.

The following steps are performed in the UI, these can also be completed by commandline or terraform.

1. In the search bar enter `AI Search` and select the service
2. Create a new service, by pressing the + icon
3. Select your subscription, enter service name e.g. `svc-crelay-search`, choose deployment region
4. Create a new index, called `transcript-store`, use the `<proj>/server/agents/recall/setup/search-schema.json` as the input schema
5. In the `.env` file set the `AZURE_SEARCH_INDEX` to the name of the index just created, e.g. `transcript-store`
6. Also set the `AZURE_SEARCH_ENDPOINT` url to the Search service just created, can be found under Overview on the side menu
7. Lastly, set the `AZURE_ADMIN_KEY`, which can be found under Settings > Keys > Primary Admin Key

### Azure AI Foundry Configuration

Login to Azure AI Foundry

1. Create a new project and give it an awesome name
2. From the Overview page, copy the `API Key` on the first page and set the `FOUNDRY_API_KEY` environment variable
3. Also on the overview page, copy the `Azure AI Foundry project endpoint` and set the `AZURE_CONN_STRING` var
4. Deploy the Open AI GPT 4.1 (or similar) model
5. From Azure OpenAI > Copy the `Azure OpenAI endpoint` and set the `AZURE_LLM_ENDPOINT` var
6. Set the `AZURE_LLM_DEPLOYMENT` to `gpt-4.1` (or whatever model you deployed), can be found under `My assets > Models + Endpoints`
7. From the model catalog, deploy the `text-embedding-3-large` model, set the `EMBED_ENDPOINT` environment variable

### Agent Configuration

Login to Azure AI Foundry

1. Create an agent
2. Copy the agent ID, starting with `asst_` and put it in the `.env` file variable named `UNDERWRITER_AGENT_ID`
3. Copy or edit the prompt from file `<proj>/server/agents/underwriter-agent/instructions.md`
4. Add Agent Action. Copy `<proj>/server/agents/underwriter-agent/tool-manifest.json` into schema of as an `OpenAPI 3.0 specified tool` Action and name it `UnderwriterBrainTool`. Note: Replace `{HOSTNAME}` with your ngrok hostname

## Azure CLI (Local Development on OSX)

Ensure Azure CLI is installed

OSX

```sh
brew update && brew install azure-cli
```

## Azure - Service User

This will be used in the Fly.io deployment (or other hosting service)
The steps below walks you through creating a service user (Service Principal) in Azure and collecting the necessary credentials for automation, scripting, or integration purposes.

## ✅ Step 1: Register an App in Microsoft Entra ID

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to: **Microsoft Entra ID** > **App registrations**
3. Click **+ New registration**
4. Fill in the form:
   - **Name**: `my-service-user`
   - **Supported account types**: _Accounts in this organizational directory only (Default)_
   - **Redirect URI**: _(Optional)_ Leave blank unless needed
5. Click **Register**

📌 **Save these values from the Overview page:**

- `CLIENT_ID` = **Application (client) ID**
- `TENANT_ID` = **Directory (tenant) ID**

## ✅ Step 2: Create a Client Secret

1. After registration, go to **Certificates & secrets**
2. Click **+ New client secret**
3. Enter a description and choose an expiry (e.g., 6 months, 12 months)
4. Click **Add**
5. **Copy the generated secret value immediately**

📌 Save this value:

- `CLIENT_SECRET` = _The generated secret value_

> ⚠️ You will not be able to retrieve the secret again after leaving the page.

## ✅ Step 3: Assign the Service Principal Access to Azure Resources

1. Go to **Subscriptions**
2. Select your target **Subscription**
3. Click **Access control (IAM)** > **+ Add > Add role assignment**
4. In the **Role** tab, select a roles `Azure AI User` and `Cognitive Services Contributor`
5. In the **Members** tab:
   - Click **+ Select members**
   - Search for the registered app by name
   - Select it and click **Review + assign**

## ✅ Step 4: Get Your Subscription ID

1. Go to **Subscriptions**
2. Select your active subscription
3. Copy the **Subscription ID** from the overview pane

📌 Save this value:

- `SUBSCRIPTION_ID` = _The Subscription's GUID_

## Deploying to Fly.io

1. `fly launch` to launch a new app with Fly
2. copy all the `.env` configuration to respective `[env]` variables in `fly.toml`
3. copy secrets to `.env.flysecrets`
4. import the secrets using `fly secrets import < ./.env.flysecrets`

# Populating Demo Data

Once the application has been deployed (or before running locally) ensure that the Twilio Sync objects are populated by running the script:
`pnpm run data:populate`
