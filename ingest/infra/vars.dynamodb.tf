variable "dynamodb_name" {
  description = "Name of DynamoDB table"
  type        = string
  default     = "data-events-datalake"
}

variable "dynamodb_hash_key" {
  description = "Table hash (primary) key"
  type        = string
  default     = "key"
}


variable "dynamodb_region_primary" {
  description = "Primary region"
  type        = string
  default     = "eu-north-1"
}


variable "dynamodb_region_secondary" {
  description = "Secondary region"
  type        = string
  default     = "eu-west-1"
}

variable "dynamodb_trigger_function_name" {
  description = "Name of Lambda function that is triggered by DynamoDB stream"
  type        = string
  default     = "data-events-ingest-demo-IntegrationEventEmitter"
}

