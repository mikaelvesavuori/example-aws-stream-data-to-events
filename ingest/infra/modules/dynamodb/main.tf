# Description
#
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table

resource "aws_dynamodb_table" "dynamodb_datalake" {
  #checkov:skip=CKV_AWS_28:Not necessary for demo
  #checkov:skip=CKV_AWS_119:Not necessary for demo
  name         = var.name
  hash_key     = var.hash_key
  billing_mode = "PAY_PER_REQUEST"

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = var.hash_key
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = true
  }

  # NOTE: Some kind of weird fuckery going on with this...
  #replica {
  #  region_name = var.region_primary
  #}

  #replica {
  #  region_name = var.region_secondary
  #}
}

resource "aws_lambda_event_source_mapping" "stream_trigger" {
  event_source_arn  = aws_dynamodb_table.dynamodb_datalake.stream_arn
  function_name     = "arn:aws:lambda:${var.region}:${var.account_number}:function:${var.trigger_function_name}"
  starting_position = "LATEST"
}
