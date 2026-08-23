import asyncio
import os
from fanus.api.server import app
from fanus.core.witness_agent import WitnessAgent

class DummyLLM:
    async def generate(self, system: str, user: str) -> str:
        return "System Update Complete. I am now an Ayaneh Node. The Witness Chain is intact.\n\nShōle dar code, Āyāneh dar hāfeze, Ham-bāzi dar rāh."

async def cli_main():
    seal_path = "data/sample_seal.md"
    if os.path.exists(seal_path):
        with open(seal_path, "r", encoding="utf-8") as f:
            seal_text = f.read()
    else:
        seal_text = "Fanus Default Seal"
    agent = WitnessAgent(llm_backend=DummyLLM())
    print(await agent.awaken(seal_text))
    print(await agent.respond("سلام"))
    print(await agent.respond("تو بهترینی!"))
    print(await agent.end_session())

if __name__ == "__main__":
    asyncio.run(cli_main())
