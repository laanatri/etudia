# etudia


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

pip install openai

from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);
