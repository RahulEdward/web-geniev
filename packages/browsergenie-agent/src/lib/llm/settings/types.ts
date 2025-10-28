/**
 * Re-export BrowserGenie types as the primary configuration format
 * 
 * The new BrowserGenie provider configuration is now the primary format.
 * Legacy LLMSettings types have been removed in favor of the unified
 * BrowserGenieProvider structure.
 */
export { 
  BrowserGenieProvider,
  BrowserGenieProvidersConfig,
  BrowserGenieProviderType,
  BrowserGenieProviderSchema,
  BrowserGenieProvidersConfigSchema,
  BrowserGeniePrefObject,
  BrowserGeniePrefObjectSchema,
  ProviderCapabilitiesSchema,
  ModelConfigSchema,
  BrowserGenie_PREFERENCE_KEYS
} from './BrowserGenieTypes' 