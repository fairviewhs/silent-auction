class Bidder < ActiveRecord::Base
  has_many :bids
  has_many :items, through: :bids

  before_save { self.email = email.downcase }

  validates :name, presence: true, length: { maximum: 50 }
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence: true, format: { with: EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
end
