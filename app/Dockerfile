FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia todos os arquivos do diretório atual do host para o diretório de trabalho no contêiner
COPY . .

# Instala as dependências do npm especificadas no arquivo package.json
RUN npm install

# Instala o Angular CLI globalmente
RUN npm install @angular/cli@15.2.10 -g

# Expõe a porta 4200 para permitir que o aplicativo Angular seja acessível de fora do contêiner
EXPOSE 4200

# Inicia o aplicativo Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
