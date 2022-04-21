# Description
#
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue

resource "aws_sqs_queue" "event_queue" {
  name = var.name

  fifo_queue                  = true
  content_based_deduplication = true
  deduplication_scope         = var.deduplication_scope
  fifo_throughput_limit       = var.fifo_throughput_limit

  kms_master_key_id                 = "alias/aws/sqs"
  kms_data_key_reuse_period_seconds = 300
}

resource "aws_lambda_event_source_mapping" "lambda_trigger" {
  event_source_arn = aws_sqs_queue.event_queue.arn
  function_name    = "arn:aws:lambda:${var.region}:${var.account_number}:function:${var.trigger_function_name}"
}
