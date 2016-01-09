json.array!(@items) do |item|
  json.extract! item, :id, :name, :price, :description
  json.url item_url(item, format: :json)
end
