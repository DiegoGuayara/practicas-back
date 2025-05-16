# 1. Usa una imagen oficial de Node.js como base
FROM node:18

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia solo los archivos de dependencias primero
COPY package*.json ./

# 4. Instala dependencias
RUN npm install

# 5. Copia el resto de los archivos de tu microservicio
COPY . .

# 6. Expón el puerto en que corre tu microservicio (debe coincidir con el PORT del .env)
EXPOSE 10101

# 7. Comando para iniciar tu app
CMD ["node", "app.js"]