// tests/index.test.mjs
import { describe, it } from "node:test"
import assert from "assert"
import { handler } from "../dist/index.js"

const TEST_JSON = {
	body: JSON.stringify({
		clientCode: "unique_client_identifier",
		address: {
			street: "Nome da Rua",
			number: "350",
			addressComplement: "Complemento",
			neighborhood: "Nome do Bairro",
			city: "Cidade",
			state: "Estado",
			longitude: "-23.6288",
			latitude: "-46.6488"
		}
	})
}

const TEST_JSON_ERROR = {
	body: JSON.stringify({})
}

describe("Lambda tests", () => {
	it("Should work", async () => {
		const response = await handler({ body: TEST_JSON.body })
		assert.equal(response.statusCode, 200)
	})

	it("Should not work", async () => {
		try {
			await handler({ body: TEST_JSON_ERROR.body })
			throw new Error("Test should have thrown an error but did not")
		} catch (error) {
			assert(error, "Expected an error to be thrown")
		}
	})
})
