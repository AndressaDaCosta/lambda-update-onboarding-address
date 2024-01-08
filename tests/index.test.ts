//tests.index.test.ts
import { handler as updateOnboardingAddressHandler } from "../src/index"
import { Context } from "aws-lambda"

//  mock do Context
const mockContext: Context = {
	callbackWaitsForEmptyEventLoop: false,
	functionName: "mockFunction",
	functionVersion: "1",
	invokedFunctionArn:
		"arn:aws:lambda:us-east-1:123456789012:function:mockFunction",
	memoryLimitInMB: "128",
	awsRequestId: "mockRequestID",
	logGroupName: "/aws/lambda/mockFunction",
	logStreamName: "mockLogStream",
	getRemainingTimeInMillis: () => 3000,
	done: (error?: Error, result?: any) => {},
	fail: (error: Error | string) => {},
	succeed: (messageOrObject: any) => {}
}

// Callback mockado
const mockCallback = () => {}

describe("Lambda tests", () => {
	// Testes para o Lambda de atualização de endereço
	describe("Update Onboarding Address Lambda tests", () => {
		test("Should update address for a given clientCode", async () => {
			const event = {
				body: JSON.stringify({
					clientCode: "codigo_do_cliente",
					address: {
						street: "Rua Exemplo",
						number: "123",
						neighborhood: "Bairro",
						city: "Cidade",
						state: "Estado",
						latitude: "-23.0000",
						longitude: "-46.0000"
					}
				})
			}
			const result = await updateOnboardingAddressHandler(
				event as any,
				mockContext,
				mockCallback
			)

			if (typeof result === "object") {
				expect(result.statusCode).toBe(200)
				const body = JSON.parse(result.body)
				expect(body.message).toBe("Endereço atualizado com sucesso!")
			} else {
				fail("Function returned void")
			}
		})

		test("Should handle empty event for update", async () => {
			const event = { body: JSON.stringify({}) }
			const result = await updateOnboardingAddressHandler(
				event as any,
				mockContext,
				mockCallback
			)

			if (typeof result === "object") {
				expect(result.statusCode).toBe(400)
			} else {
				fail("Function returned void")
			}
		})
	})
})
