import { z } from 'zod'

/**
 * BrowserGenie Provider type enum
 */
export const BrowserGenieProviderTypeSchema = z.enum([
  'BrowserGenie',
  'openai',
  'openai_compatible',
  'anthropic',
  'google_gemini',
  'ollama',
  'openrouter',
  'custom'
])
export type BrowserGenieProviderType = z.infer<typeof BrowserGenieProviderTypeSchema>

/**
 * Provider capabilities configuration
 */
export const ProviderCapabilitiesSchema = z.object({
  supportsImages: z.boolean().optional()  // Whether the provider supports image inputs
})

/**
 * Model configuration for a provider
 */
export const ModelConfigSchema = z.object({
  contextWindow: z.union([z.number(), z.string()]).transform(val => {
    // Convert string to number if needed (from Chrome settings UI)
    return typeof val === 'string' ? parseInt(val, 10) : val
  }).optional(),  // Maximum context window size
  temperature: z.union([z.number(), z.string()]).transform(val => {
    // Convert string to number if needed (from Chrome settings UI)
    return typeof val === 'string' ? parseFloat(val) : val
  }).pipe(z.number().min(0).max(2)).optional()  // Default temperature setting
})

/**
 * Individual provider configuration from BrowserGenie
 */
export const BrowserGenieProviderSchema = z.object({
  id: z.string(),  // Unique provider identifier
  name: z.string(),  // Display name for the provider
  type: BrowserGenieProviderTypeSchema,  // Provider type
  isDefault: z.boolean(),  // Whether this is the default provider
  isBuiltIn: z.boolean(),  // Whether this is a built-in provider
  baseUrl: z.string().optional(),  // API base URL
  apiKey: z.string().optional(),  // API key for authentication
  modelId: z.string().optional(),  // Model identifier
  capabilities: ProviderCapabilitiesSchema.optional(),  // Provider capabilities
  modelConfig: ModelConfigSchema.optional(),  // Model configuration
  createdAt: z.string(),  // ISO timestamp of creation
  updatedAt: z.string()  // ISO timestamp of last update
})

export type BrowserGenieProvider = z.infer<typeof BrowserGenieProviderSchema>

/**
 * Complete BrowserGenie providers configuration
 */
export const BrowserGenieProvidersConfigSchema = z.object({
  defaultProviderId: z.string(),  // ID of the default provider
  providers: z.array(BrowserGenieProviderSchema)  // List of all providers
})

export type BrowserGenieProvidersConfig = z.infer<typeof BrowserGenieProvidersConfigSchema>

/**
 * Preference object returned by chrome.BrowserGenie.getPref
 */
export const BrowserGeniePrefObjectSchema = z.object({
  key: z.string(),  // Preference key
  type: z.string(),  // Preference type
  value: z.any()  // Preference value (string for JSON preferences)
})

export type BrowserGeniePrefObject = z.infer<typeof BrowserGeniePrefObjectSchema>

/**
 * Browser preference keys for BrowserGenie
 */
export const BrowserGenie_PREFERENCE_KEYS = {
  PROVIDERS: 'BrowserGenie.providers'
} as const

export const DEFAULT_BrowserGenie_PROVIDER_ID = 'BrowserGenie'

export function createDefaultBrowserGenieProvider(): BrowserGenieProvider {
  const timestamp = new Date().toISOString()
  return {
    id: DEFAULT_BrowserGenie_PROVIDER_ID,
    name: 'BrowserGenie',
    type: 'BrowserGenie',
    isDefault: true,
    isBuiltIn: true,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

export function createDefaultProvidersConfig(): BrowserGenieProvidersConfig {
  const provider = createDefaultBrowserGenieProvider()
  return {
    defaultProviderId: provider.id,
    providers: [provider]
  }
}



