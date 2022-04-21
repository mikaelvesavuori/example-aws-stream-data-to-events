# Description
#
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_bus
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule

resource "aws_cloudwatch_event_bus" "data_ingest_bus" {
  name = var.name
}
