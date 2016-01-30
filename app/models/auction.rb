class Auction < ActiveRecord::Base
  has_many :bids
  has_many :items
  has_and_belongs_to_many :admins

  validates :name, presence: true
  validates :host, presence: true
  validates :description, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
end
