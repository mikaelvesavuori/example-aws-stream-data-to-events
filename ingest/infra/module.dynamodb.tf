module "dynamodb" {
  source = "./modules/dynamodb"

  account_number = var.account_number
  region         = var.region

  name     = var.dynamodb_name
  hash_key = var.dynamodb_hash_key

  region_primary   = var.dynamodb_region_primary
  region_secondary = var.dynamodb_region_secondary

  trigger_function_name = var.dynamodb_trigger_function_name
}
