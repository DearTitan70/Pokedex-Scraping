FROM node:18-alpine

# Crear el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el código fuente y las credenciales
COPY src ./src
COPY credentials.json ./

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
