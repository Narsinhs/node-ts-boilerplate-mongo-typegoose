import { Get, getMetadataArgsStorage, JsonController } from "routing-controllers";
import { getFromContainer, MetadataStorage } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllersToSpec } from "routing-controllers-openapi";

@JsonController()
export class DocumentController {
  constructor() {}

  @Get("/swagger.json")
  Get(): any {
    const storage = getMetadataArgsStorage();
    const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
    const schemas = validationMetadatasToSchemas(metadatas, {
      refPointerPrefix: "#/components/schemas/"
    });
    return routingControllersToSpec(
      storage,
      {},
      {
        components: {
          schemas: schemas,
          securitySchemes: {
            apiKeyAuth: {
              type: "apiKey",
              description: "Api authentication token",
              name: "Authorization",
              in: "header"
            }
          }
        },
        info: { title: process.env.APP_NAME, version:  process.env.APP_VERSION }
      }
    );
  }
}
