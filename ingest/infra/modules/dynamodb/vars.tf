variable "account_number" {
  description = "Your AWS account number"
  type        = string
}

variable "region" {
  description = "Your AWS region"
  type        = string
}

variable "name" {
  description = "Name of DynamoDB table"
  type        = string
}

variable "hash_key" {
  description = "Table hash (primary) key"
  type        = string
}

variable "region_primary" {
  description = "Primary region"
  type        = string
}


variable "region_secondary" {
  description = "Secondary region"
  type        = string
}

variable "trigger_function_name" {
  description = "Name of Lambda function that is triggered by DynamoDB stream"
  type        = string
}
