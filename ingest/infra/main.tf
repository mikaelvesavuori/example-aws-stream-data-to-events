terraform {
  cloud {
    organization = "some-organization"
    workspaces {
      tags = ["data-events-demo"]
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1"

  default_tags {
    tags = {
      Environment = "test"
      Project     = "data-to-events"
    }
  }
}
