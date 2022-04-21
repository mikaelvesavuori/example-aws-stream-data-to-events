variable "kinesis_stream_name" {
  description = "Name of Kinesis Firehose delivery stream"
  type        = string
  default     = "data-events-stream"
}

variable "kinesis_lambda_name" {
  description = "Name of Lambda function that is triggered by Kinesis"
  type        = string
  default     = "data-events-ingest-demo-Transformer"
}

variable "kinesis_role_name" {
  description = "Kinesis role name"
  type        = string
  default     = "DataIngestFirehoseRole"
}

variable "kinesis_policy_name" {
  description = "Kinesis policy name"
  type        = string
  default     = "DataIngestFirehosePolicy"
}
