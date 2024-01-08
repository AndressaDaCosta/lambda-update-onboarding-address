// src/index.ts

console.log(`Loading lambda`)

import dotenv from "dotenv"
dotenv.config()

console.log(
	`Environment: ${
		process.env.NODE_ENV == "development" ? "development" : "production"
	}`
)

import {
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult
} from "aws-lambda"
import { z } from "zod"
import BodySchema from "./ValidationSchemas/BodySchema"
// import axios from "axios"
// import AWS from "aws-sdk"

// Config AWS SDK
// AWS.config.update({ region: "sua-região" })
// const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
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
			"Atualizar no banco de dados:",
			parsedBody.clientCode,
			parsedBody.address
		)
		/*
			// Conecta com DynamoDB para atualizar os dados
			const params = {
			  TableName: 'DynamoDBTableName',
			  Key: { clientCode: clientCode },
			  UpdateExpression: 'set address = :a',
			  ExpressionAttributeValues: {
				':a': address
			  },
			  ReturnValues: 'UPDATED_NEW'
			};
		
			await dynamoDb.update(params).promise();
			console.log('Dados atualizados no DynamoDB com sucesso.');*/

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Endereço atualizado com sucesso!"
			})
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "O formato do corpo da requisição é inválido",
					errors: error.errors
				})
			}
		} else {
			console.error("Erro:", error)
			return {
				statusCode: 500,
				body: JSON.stringify({ message: "Falha ao atualizar endereço" })
			}
		}
	}
}
