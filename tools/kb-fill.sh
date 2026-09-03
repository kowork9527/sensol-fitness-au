#!/usr/bin/env bash
# Knowledge Base FAQ auto-fill script for Sensol Fitness
# Usage: SHOPIFY_ADMIN_TOKEN=shpat_xxx bash tools/kb-fill.sh [step]
#   step: introspect (find FAQ metaobject definition) | write (create 15 FAQs) | verify
set -euo pipefail

SHOP="1heajg-6u.myshopify.com"
API="https://$SHOP/admin/api/2025-01/graphql.json"
TOKEN="${SHOPIFY_ADMIN_TOKEN:?Need SHOPIFY_ADMIN_TOKEN env var (Admin API access token with metaobjects read/write scopes)}"
STEP="${1:-write}"

gql() {
  curl -s -X POST "$API" \
    -H "X-Shopify-Access-Token: $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$1"
}

case "$STEP" in
  introspect)
    # Find the Knowledge Base app's FAQ metaobject definition (type + field keys)
    gql '{"query":"{ metaobjectDefinitions(first: 50, sortKey: TYPE) { edges { node { type name fieldDefinitions { key name required type { name } } } } } }"}' \
      | python3 -c '
import json, sys
d = json.load(sys.stdin)
defs = d["data"]["metaobjectDefinitions"]["edges"]
print(f"Found {len(defs)} metaobject definitions:")
for e in defs:
    n = e["node"]
    fields = ", ".join(f"{f[\"key\"]}({f[\"type\"][\"name\"]}{\"*\" if f[\"required\"] else \"\"})" for f in n["fieldDefinitions"])
    marker = " <-- likely Knowledge Base FAQ" if any(k in n["type"].lower() for k in ("faq", "knowledge", "kb")) else ""
    print(f"  {n[\"type\"]}: {fields}{marker}")
'
    ;;

  write)
    # FAQ payloads — sourced from docs/knowledge-base-faqs.md (verified store facts)
    python3 - << 'PYEOF' > /tmp/kb-payloads.json
import json
faqs = [
  ("return-policy", "What is your return policy?", "We offer a 30-day Change of Mind Return Policy starting from the date your order was delivered. You need to notify our support team within 30 days, and return shipping to our Australian warehouse is arranged and paid by the buyer."),
  ("delivery-time", "How long does delivery take?", "Metro delivery typically arrives within 2-5 business days, and every shipment is fully insured."),
  ("shipping-free", "Is shipping free?", "Yes, metro delivery is free of charge."),
  ("warranty-coverage", "What does the warranty cover?", "Sensol reformers carry tiered warranty coverage: 5 years on the frame, 3 years on electronics, 2 years on mechanical components, and 1 year on wear parts, in addition to your rights under Australian Consumer Law."),
  ("warranty-claim", "How do I make a warranty claim?", "Contact our customer care team in writing at support@sensolfitness.com.au with your order details, and we will guide you through the claim process."),
  ("contact-support", "How do I contact support?", "Email support@sensolfitness.com.au or call (+61) 480-899-797."),
  ("australian-company", "Are you an Australian company?", "Yes. SENSOL is a registered brand of DUTE FITNESS (AUSTRALIA) PTY. LTD., located at Melaan Way, Clyde North VIC 3978, Australia."),
  ("consumer-rights", "What are my consumer rights?", "All purchases are covered by Australian Consumer Law, including consumer guarantees that cannot be excluded, in addition to our tiered warranty coverage."),
  ("smart-vs-mechanical", "What is the difference between the Smart Series and Mechanical Series?", "Smart Series reformers (RS02, RS02 PRO, RS03 PRO) use servo-motor digital resistance adjustable in precise 1 kg increments. Mechanical Series reformers (FLEX, FLEX AIR, FLEX PRO) use spring-based resistance and fold for compact storage."),
  ("foldable-reformers", "Which reformers can fold for storage?", "The Mechanical Series - FLEX, FLEX AIR, and FLEX PRO - are designed to fold for space-saving storage at home."),
  ("sensol-app", "What is the Sensol App?", "The Sensol App is your intelligent training companion, available on iOS and Android. It provides real-time resistance control during your training sessions."),
  ("resistance-precision", "How precise is the resistance on Smart Series reformers?", "Smart Series reformers adjust digital resistance in precise 1 kg increments, powered by servo motors."),
  ("product-lineup", "Which products are in each series?", "Smart Series includes RS02, RS02 PRO, and RS03 PRO (digital weight reformers). Mechanical Series includes FLEX, FLEX AIR, and FLEX PRO (spring-based foldable reformers)."),
  ("brand-sensol", "What is SENSOL?", "SENSOL is an Australian movement-equipment house designing premium pilates reformers, engineered in Melbourne."),
  ("where-to-buy", "Where can I buy Sensol products?", "Sensol reformers are available exclusively through our official online store."),
]
print(json.dumps(faqs))
PYEOF
    # First introspect to find the FAQ definition type dynamically
    DEFS=$(gql '{"query":"{ metaobjectDefinitions(first: 50) { edges { node { type fieldDefinitions { key required } } } } }"}')
    FAQ_TYPE=$(echo "$DEFS" | python3 -c '
import json, sys
d = json.load(sys.stdin)
for e in d["data"]["metaobjectDefinitions"]["edges"]:
    n = e["node"]
    if any(k in n["type"].lower() for k in ("faq", "knowledge", "kb")):
        keys = sorted(f["key"] for f in n["fieldDefinitions"])
        print(n["type"]); print("FIELDS:" + ",".join(keys), file=sys.stderr)
        break
')
    if [ -z "$FAQ_TYPE" ]; then
      echo "ERROR: No FAQ-like metaobject definition found. Install Shopify Knowledge Base app first, or run 'introspect' to inspect."
      exit 1
    fi
    echo "Using definition: $FAQ_TYPE"
    # Detect field keys (question/answer key names)
    FKEYS=$(echo "$DEFS" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for e in d['data']['metaobjectDefinitions']['edges']:
    if e['node']['type'] == '$FAQ_TYPE':
        print(','.join(f['key'] for f in e['node']['fieldDefinitions']))
        break
")
    QKEY=$(echo "$FKEYS" | tr ',' '\n' | grep -iE '^(question|q|title|heading)$' | head -1)
    AKEY=$(echo "$FKEYS" | tr ',' '\n' | grep -iE '^(answer|a|body|content|text)$' | head -1)
    echo "Question field: $QKEY | Answer field: $AKEY"
    if [ -z "$QKEY" ] || [ -z "$AKEY" ]; then
      echo "ERROR: Could not detect question/answer field keys. Fields: $FKEYS"
      exit 1
    fi
    # Write all FAQs
    python3 - << PYEOF > /tmp/kb-write-body.json
import json
faqs = json.load(open('/tmp/kb-payloads.json'))
mutations = []
for i, (handle, q, a) in enumerate(faqs):
    mutations.append(
        f'm{i}: metaobjectCreate(input: {{type: "$FAQ_TYPE", handle: "kb-{handle}", capabilities: {{publishable: {{status: ACTIVE}}}}, fields: [{{key: "$QKEY", value: {json.dumps(q)}}}, {{key: "$AKEY", value: {json.dumps(a)}}}]}}) {{ userErrors {{ field message }} metaobject {{ id handle }} }} }}'
    )
q = "mutation { " + " ".join(mutations) + " }"
print(json.dumps({"query": q}))
PYEOF
    gql "$(cat /tmp/kb-write-body.json)" | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "errors" in d: print("API errors:", json.dumps(d["errors"])[:500]); sys.exit(1)
ok, fail = 0, 0
for k, v in d.get("data", {}).items():
    ue = v.get("userErrors", [])
    if ue: fail += 1; print(f"  {k} FAILED: {ue}")
    else: ok += 1
print(f"Wrote {ok} FAQs, {fail} failures")
'
    ;;

  verify)
    gql '{"query":"{ metaobjects(first: 50, type: \"shopify_app_knowledge_base_faq\", sortKey: UPDATED_AT) { edges { node { handle } } } }"}' 2>/dev/null | head -c 400
    echo ""
    echo "(If empty above, run introspect to get the correct type, then adjust verify query)"
    ;;

  *) echo "Unknown step: $STEP. Use: introspect | write | verify" ;;
esac
