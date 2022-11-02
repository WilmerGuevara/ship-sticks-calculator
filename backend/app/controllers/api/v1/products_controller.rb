class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @products = Product.includes(:product_type).all
  end

  def show;
  end

  # Get the product that best fits for the selected dimensions and weight,
  # you can always go bigger, but you can’t go smaller (i.e. if an item is 5"x5"x5", you will need the 6"x5"x6" package,
  # not the 4"x5"x5" package). This is also the case for weight.
  # If params have the exact dimensions and weight of a product then the difference is zero and it returns that product
  # otherwise, it looks for a product with the less useless space and the less useless weight.
  # If there is no product that fits the dimensions and weight, it returns the product with the less useless space and the less useless weight.
  # If there is no product, it returns nil.
  # The useless space is the space that is not used by the product, and the useless weight is the weight that is not used by the product.
  # The useless space and the useless weight are calculated by subtracting the product dimensions and weight to the given dimensions and weight.
  # The less useless space and the less useless weight are calculated by adding the useless space and the useless weight.
  # The product with the less useless space and the less useless weight is the product that best fits for the selected dimensions and weight.
  # @param [Float] length
  # @param [Float] width
  # @param [Float] height
  # @param [Float] weight
  # @return [Product] product that best fits for the selected dimensions and weight
  def find_best_fit
    # if param cannot be converted to float it returns 0
    length = Float(params[:length]) rescue 0
    width = Float(params[:width]) rescue 0
    height = Float(params[:height]) rescue 0
    weight = Float(params[:weight]) rescue 0

      
    best_fit = Product.collection.aggregate([
                      {
                          # find products with dimensions and weight greater than given in params
                          "$match": {
                              "length": { "$gte": length },
                              "width": { "$gte": width },
                              "height": { "$gte": height },
                              "weight": { "$gte": weight }
                          }
                      },
                      {
                          # map products to a field with the sum of differences
                          "$project": {
                              "product_type": 1,
                              "length": 1,
                              "width": 1,
                              "height": 1,
                              "weight": 1,
                              "sum_of_differences": {
                                  "$add": [
                                      { "$subtract": [ "$length", length ] },
                                      { "$subtract": [ "$width", width ] },
                                      { "$subtract": [ "$height", height ] },
                                      { "$subtract": [ "$weight", weight ] }
                                  ]
                              }
                          }
                      },
                      {
                          # sort ascending by differences
                          "$sort": { "sum_of_differences": 1 }
                      },
                      {
                          # get the first result, the minimum difference
                          '$limit': 1
                      }
                  ]).first
   
    # if best_fit is nil assign an empty hash with _id key and nil value
    # this is necessary because the next line will try to access to the _id key
    # and if it is nil it will raise an error
    best_fit ||= {_id: nil} 

    # find the product type name
    best_fit[:product_type] = ProductType.find(best_fit[:product_type]).name if best_fit[:product_type]

    # return the product with the id and the product type name
    @product = Product.includes(:product_type).find(best_fit['_id'].to_s)

    render :show
  end

  #create a new product with the given params and return the product  with the id and the product type  name  in json format
  def create
    @product = Product.new(product_params)
    if @product.save
      render :show, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  #update the product with the given params and return the product  with the id and the product type  name  in json format
  def update
    if @product.update(product_params)
      render :show, status: :ok, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.includes(:product_type).find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def product_params
    params.require(:product).permit(:name, :length, :width, :height, :weight, :product_type_id)
  end
end
