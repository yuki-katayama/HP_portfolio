all:
	rm -rf ./dist
	npm run build
	cdk synth
	cdk deploy

tester:
	npm run build
	npm run test

zone:
	aws route53 list-hosted-zones
	echo "aws route53 list-resource-record-sets --hosted-zone-id {ID}"