from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

driver = webdriver.Chrome()
driver.get("https://yourwebsite.com")

# Wait for page load
time.sleep(3)

# Click a button
driver.find_element(By.ID, "signup-btn").click()

time.sleep(2)

# Fill form
driver.find_element(By.NAME, "email").send_keys("test@example.com")

# Submit form
driver.find_element(By.ID, "submit-btn").click()

time.sleep(5)

driver.quit()