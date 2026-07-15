# Stage 1: Build the Angular frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build -- --configuration=production

# Stage 2: Base image for running the ASP.NET app
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

# Stage 3: Build the ASP.NET backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy the backend project files
COPY ["backend/ParasnathAPI/ParasnathAPI.csproj", "backend/ParasnathAPI/"]
RUN dotnet restore "backend/ParasnathAPI/ParasnathAPI.csproj"

# Copy the rest of the backend files
COPY backend/ParasnathAPI/ backend/ParasnathAPI/
WORKDIR "/src/backend/ParasnathAPI"
RUN dotnet build "ParasnathAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 4: Publish the application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ParasnathAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 5: Final image for production
FROM base AS final
WORKDIR /app

# Copy the published backend output
COPY --from=publish /app/publish .

# Copy the compiled Angular frontend into the ASP.NET wwwroot directory
COPY --from=frontend-build /app/frontend/dist/frontend/browser ./wwwroot

# Run the application
ENTRYPOINT ["dotnet", "ParasnathAPI.dll"]
