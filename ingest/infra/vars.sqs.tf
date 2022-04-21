variable "sqs_name" {
  description = "Name of FIFO (first-in-first-out) queue"
  type        = string
  default     = "data-events-queue.fifo"
}

variable "sqs_deduplication_scope" {
  description = "Deduplication scope setting"
  type        = string
  default     = "messageGroup"
}

variable "sqs_fifo_throughput_limit" {
  description = "FIFO throughput limit setting"
  type        = string
  default     = "perMessageGroupId"
}


variable "sqs_trigger_function_name" {
  description = "Name of Lambda function that is triggered by SQS"
  type        = string
  default     = "data-events-ingest-demo-EventStorer"
}
