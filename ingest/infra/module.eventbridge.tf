module "eventbridge" {
  source = "./modules/eventbridge"

  name = var.eventbridge_name
}
