class Bid < ActiveRecord::Base
  belongs_to :Item
  belongs_to :Auction

  validates :name, presence: true
  validates :email, presence: true
  validates_format_of :email,:with => Devise::email_regexp
  validates :phone, presence: true

  def higher_price(item)
    if item.bids.count > 0
      if self.bid_price <= item.bids.last.bid_price
        self.errors.add(:bid_price, "must be higher than existing ones.")
        return false
      end
    else
      if self.bid_price < item.price
        self.errors.add(:bid_price, "cannot be less than the base price.")
        return false
      end
    end
    return true
  end

  def name_censored
    censored = self.name[0]
    censored +=  '*' * (self.name.length - 2)
    censored += self.name[-1, 1]
    return censored
  end
end
