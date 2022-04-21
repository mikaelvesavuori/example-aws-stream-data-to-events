module "sqs" {
  source = "./modules/sqs"

  account_number = var.account_number
  region         = var.region

  name                  = var.sqs_name
  deduplication_scope   = var.sqs_deduplication_scope
  fifo_throughput_limit = var.sqs_fifo_throughput_limit
  trigger_function_name = var.sqs_trigger_function_name
}
