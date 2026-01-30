import type { SwaggerOptions } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load OpenAPI spec from YAML file
const yamlPath = join(__dirname, '../../docs/v1/openapi.yml');
const yamlContent = readFileSync(yamlPath, 'utf8');
export const swaggerDocument = yaml.load(yamlContent) as Record<string, unknown>;

export const swaggerOptions: SwaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express API Documentation',
};

