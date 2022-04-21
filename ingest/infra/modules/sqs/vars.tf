variable "account_number" {
  description = "Your AWS account number"
  type        = string
}

variable "region" {
  description = "Your AWS region"
  type        = string
}

variable "name" {
  description = "Name of FIFO (first-in-first-out) queue"
  type        = string
}

variable "deduplication_scope" {
  description = "Deduplication scope setting"
  type        = string
}

variable "fifo_throughput_limit" {
  description = "FIFO throughput limit setting"
  type        = string
}

variable "trigger_function_name" {
  description = "Name of Lambda function that is triggered by SQS"
  type        = string
}
