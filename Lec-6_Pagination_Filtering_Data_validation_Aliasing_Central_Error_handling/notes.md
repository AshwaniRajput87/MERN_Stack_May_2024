
# Filtering data:
-------------------
https://www.flipkart.com/audio-video/speakers/pr?sid=0pm%2C0o7&sort=popularity&param=8755&p%5B%5D=facets.rating%255B%255D%3D4%25E2%2598%2585%2B%2526%2Babove&param=443&hpid=-9HuwFIVtikIZ8W21KTsvKp7_Hsxr70nj65vMAAFKlc%3D&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InZhbHVlQ2FsbG91dCI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ2YWx1ZUNhbGxvdXQiLCJpbmZlcmVuY2VUeXBlIjoiVkFMVUVfQ0FMTE9VVCIsInZhbHVlcyI6WyJGcm9tIOKCuTQ5OSoiXSwidmFsdWVUeXBlIjoiTVVMVElfVkFMVUVEIn19LCJoZXJvUGlkIjp7InNpbmdsZVZhbHVlQXR0cmlidXRlIjp7ImtleSI6Imhlcm9QaWQiLCJpbmZlcmVuY2VUeXBlIjoiUElEIiwidmFsdWUiOiJBQ0NHSjY1R0dUREVKQkJOIiwidmFsdWVUeXBlIjoiU0lOR0xFX1ZBTFVFRCJ9fSwidGl0bGUiOnsibXVsdGlWYWx1ZWRBdHRyaWJ1dGUiOnsia2V5IjoidGl0bGUiLCJpbmZlcmVuY2VUeXBlIjoiVElUTEUiLCJ2YWx1ZXMiOlsiQmVzdCBTZWxsaW5nIE1vYmlsZSBTcGVha2VycyJdLCJ2YWx1ZVR5cGUiOiJNVUxUSV9WQUxVRUQifX19fX0%3D&p%5B%5D=facets.price_range.from%3D800&p%5B%5D=facets.price_range.to%3D1300&p%5B%5D=facets.type%255B%255D%3DHome%2BAudio%2BSpeaker&p%5B%5D=facets.type%255B%255D%3DGaming%2BSpeaker&p%5B%5D=facets.type%255B%255D%3DHome%2BTheatre&p%5B%5D=facets.type%255B%255D%3DLaptop%252FDesktop%2BSpeaker&p%5B%5D=facets.type%255B%255D%3DMobile%252FTablet%2BSpeaker&p%5B%5D=facets.type%255B%255D%3DSoundbar

# mongodb operators:

https://www.mongodb.com/docs/manual/reference/operator/query/


# what is aliasing and how does this help?

  - generally refers to a technique that is used to provide a short and meaningful name. will be using for routes or parameters.

  - eg: /api/v1/products?sort=price asc&filter={"price": {"lte": 10000}}

  - cheapest products data:
     /api/v1/products/cheapest


# big Billion Day sales are running

  - bigBillionDay route

    - what criteria can it contain? top5Products

       - products that are less in stock (for fater clearance from stock quantity)
       - rating greater than 4.5
       - result only top 5 Products 
