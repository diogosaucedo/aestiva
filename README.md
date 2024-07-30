# Executar com Docker

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama -e OLLAMA_ORIGINS="*" -e OLLAMA_NUM_THREADS=20 -e OLLAMA_MAX_LOADED=1 ollama/ollama
```