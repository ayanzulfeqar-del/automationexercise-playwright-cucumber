Feature: Products - list, details, search, category and brand

  Background:
    Given the user is on the home page

  @smoke
  Scenario: All products page shows all products
    When the user clicks on Products
    Then the page title is "All Products"
    And 34 products are shown

  @smoke
  Scenario: Open first product and check its details
    When the user clicks on Products
    And the user opens product "Blue Top"
    Then the product detail page is shown
    And the product is "Blue Top" in "Women > Tops" with price "Rs. 500" and brand "Polo"
    And availability is "In Stock" and condition is "New"

  Scenario Outline: Check details of different products
    When the user clicks on Products
    And the user opens product "<name>"
    Then the product is "<name>" in "<category>" with price "<price>" and brand "<brand>"

    Examples:
      | name               | category      | price    | brand  |
      | Men Tshirt         | Men > Tshirts | Rs. 400  | H&M    |
      | Sleeveless Dress   | Women > Dress | Rs. 1000 | Madame |
      | Soft Stretch Jeans | Men > Jeans   | Rs. 799  | Polo   |

  Scenario Outline: Search a product
    When the user clicks on Products
    And the user searches for "<product>"
    Then the page title is "Searched Products"
    And "<product>" is in the product list

    Examples:
      | product    |
      | Blue Top   |
      | Men Tshirt |
      | Winter Top |

  Scenario: Search with a word that matches nothing
    When the user clicks on Products
    And the user searches for "xyzabc123"
    Then the page title is "Searched Products"
    And 0 products are shown

  Scenario Outline: View products of a category
    When the user clicks on Products
    And the user opens category "<main>" and sub category "<sub>"
    Then the page title is "<title>"
    And some products are shown

    Examples:
      | main  | sub     | title                  |
      | Women | Dress   | Women - Dress Products |
      | Women | Tops    | Women - Tops Products  |
      | Men   | Tshirts | Men - Tshirts Products |
      | Men   | Jeans   | Men - Jeans Products   |

  Scenario Outline: Brand page shows the same number of products as the sidebar
    When the user clicks on Products
    And the user opens brand "<brand>"
    Then the page title is "Brand - <brand> Products"
    And the number of products matches the sidebar count for "<brand>"

    Examples:
      | brand  |
      | Polo   |
      | H&M    |
      | Madame |
      | Biba   |

  Scenario: Switch from one brand to another
    When the user clicks on Products
    And the user opens brand "Polo"
    Then the page title is "Brand - Polo Products"
    When the user opens brand "Madame"
    Then the page title is "Brand - Madame Products"
    And some products are shown