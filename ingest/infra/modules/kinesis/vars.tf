variable "account_number" {
  description = "Your AWS account number"
  type        = string
}

variable "region" {
  description = "Your AWS region"
  type        = string
}

variable "stream_name" {
  description = "Name of Kinesis Firehose delivery stream"
  type        = string
}

variable "lambda_name" {
  description = "Name of Lambda function that is triggered by Kinesis"
  type        = string
}

variable "role_name" {
  description = "Kinesis role name"
  type        = string
}

variable "policy_name" {
  description = "Kinesis policy name"
  type        = string
}

variable "bucket_arn" {
  description = "ARN of S3 bucket"
  type        = string
}
