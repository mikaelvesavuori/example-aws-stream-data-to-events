variable "s3_bucket_name" {
  description = "Name of S3 bucket, make sure to set it to some other value"
  type        = string
  default     = "data-events-test-123456789"
}

variable "s3_bucket_arn" {
  description = "ARN of S3 bucket, make sure the name at the end is same as s3_bucket_name value"
  type        = string
  default     = "arn:aws:s3:::data-events-test-123456789"
}
