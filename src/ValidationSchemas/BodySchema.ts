// src/ValidationSchemas/BodySchema.ts
import { z } from "zod"

const AddressSchema = z.object({
	street: z.string(),
	number: z.string(),
	neighborhood: z.string(),
	city: z.string(),
	state: z.string(),
	latitude: z.string().optional(),
	longitude: z.string().optional()
})

const BodySchema = z.object({
	clientCode: z.string(),
	address: AddressSchema
})

export default BodySchema
