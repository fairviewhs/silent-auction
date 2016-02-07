class Item < ActiveRecord::Base
  has_many :bids
  belongs_to :Auction

  validates :name, presence: true
  validates :price, presence: true, numericality: true
  validates :description, presence: true

  has_attached_file :picture, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: ":style/missing.png"
  has_attached_file :picture2, styles: { medium: "300x300>", thumb: "100x100>" }
  has_attached_file :picture3, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/
end
