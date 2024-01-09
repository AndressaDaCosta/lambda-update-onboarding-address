// src/index.ts

import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult
} from "aws-lambda"
import { z } from "zod"
import BodySchema from "./ValidationSchemas/BodySchema"
import dotenv from "dotenv"
// import axios from "axios"
// import AWS from "aws-sdk"

console.log(`Loading lambda`)

dotenv.config()

console.log(
	`Environment: ${
		process.env.NODE_ENV == "development" ? "development" : "production"
	}`
)

// Config AWS SDK
// AWS.config.update({ region: "sua-região" })
// const dynamoDb = new AWS.DynamoDB.DocumentClient()

export async function handler(
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
	console.log("Event", event)

	// Verifica se o corpo do evento não é nulo antes de analisar
	if (!event.body || event.body === "{}") {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "O corpo da requisição está vazio ou inválido"
			})
		}
	}

	try {
		const parsedBody = BodySchema.parse(JSON.parse(event.body))

		console.log(
			"Update in database:",
			parsedBody.clientCode,
			parsedBody.address
		)
		/*
		 const { clientCode, address } = parsedBody;
        const getResult = await dynamoDb.get({
            TableName: 'DynamoDBTableName',
            Key: { id: clientCode }
        }).promise();

        if (!getResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Usuário não encontrado" })
            };
        }

      // Atualiza o endereço no objeto recuperado
    	getResult.Item.address = address;

        await dynamoDb.update({
            TableName: 'DynamoDBTableName',
            Key: { id: clientCode },
            UpdateExpression: 'set address = :address',
            ExpressionAttributeValues: {
                ':address': getResult.Item.address
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();

		console.log('Data updated in DynamoDB successfully.');
*/
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Endereço atualizado com sucesso!"
			})
		}
	} catch (error) {
		console.error("Erro:", error)
		return {
			statusCode: error ? 400 : 500,
			body: JSON.stringify({
				message: error
					? "Erro de validação na entrada"
					: "Erro interno no servidor",
				...(error && { errors: error.errors })
			})
		}
	}
}
