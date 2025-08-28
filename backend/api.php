<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enhanced error handling and logging
function logError($message, $context = []) {
    error_log(date('Y-m-d H:i:s') . " [ERROR] " . $message . " " . json_encode($context));
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

$csvFile = __DIR__ . '/presale_participants.csv';
$presaleDataFile = __DIR__ . '/../presale.json';

function initCsvFile($file) {
    if (!file_exists($file)) {
        $header = ['user_address', 'network', 'amount', 'stage_presale', 'token_price', 'timestamp'];
        $fp = fopen($file, 'w');
        fputcsv($fp, $header);
        fclose($fp);
    }
}

function getCurrentStage() {
    global $presaleDataFile;
    
    if (file_exists($presaleDataFile)) {
        $presaleData = json_decode(file_get_contents($presaleDataFile), true);
        return $presaleData['progressBar']['currentStage'] ?? 1;
    }
    return 1;
}

function getTokenPrice($stage) {
    global $presaleDataFile;
    
    if (file_exists($presaleDataFile)) {
        $presaleData = json_decode(file_get_contents($presaleDataFile), true);
        $stages = $presaleData['progressBar']['stages'] ?? [];
        
        foreach ($stages as $index => $stageData) {
            if (($index + 1) === $stage) {
                return 0.1 + ($stage - 1) * 0.1; // Base price + stage increment
            }
        }
    }
    return 0.1; // Default price
}

function logDeposit($data) {
    global $csvFile;
    
    initCsvFile($csvFile);
    
    $currentStage = getCurrentStage();
    $tokenPrice = getTokenPrice($currentStage);
    
    $row = [
        $data['user_address'],
        $data['network'],
        $data['amount'],
        $currentStage,
        $tokenPrice,
        date('Y-m-d H:i:s')
    ];
    
    $fp = fopen($csvFile, 'a');
    fputcsv($fp, $row);
    fclose($fp);
    
    return [
        'success' => true,
        'stage' => $currentStage,
        'token_price' => $tokenPrice,
        'tokens_received' => $data['amount'] / $tokenPrice
    ];
}

function getDeposits($address = null) {
    global $csvFile;
    
    if (!file_exists($csvFile)) {
        return [];
    }
    
    $deposits = [];
    $fp = fopen($csvFile, 'r');
    
    $header = fgetcsv($fp);
    
    while (($row = fgetcsv($fp)) !== false) {
        if ($address && $row[0] !== $address) {
            continue;
        }
        
        $deposits[] = array_combine($header, $row);
    }
    
    fclose($fp);
    return $deposits;
}

// Main request handling
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            jsonResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        if (!$input || !isset($input['user_address']) || !isset($input['network']) || !isset($input['amount'])) {
            jsonResponse(['error' => 'Missing required fields: user_address, network, amount'], 400);
        }
        
        // Validate input data
        if (!filter_var($input['amount'], FILTER_VALIDATE_FLOAT) || $input['amount'] <= 0) {
            jsonResponse(['error' => 'Invalid amount value'], 400);
        }
        
        if (empty(trim($input['user_address']))) {
            jsonResponse(['error' => 'Invalid user address'], 400);
        }
        
        $result = logDeposit($input);
        jsonResponse($result);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $address = $_GET['address'] ?? null;
        
        if ($address && empty(trim($address))) {
            jsonResponse(['error' => 'Invalid address parameter'], 400);
        }
        
        $deposits = getDeposits($address);
        jsonResponse(['deposits' => $deposits]);
        
    } else {
        jsonResponse(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    logError('Unhandled exception', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
    jsonResponse(['error' => 'Internal server error'], 500);
}
?>
