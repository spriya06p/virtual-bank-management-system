import java.util.*;

// ==== Entity Classes ====
class User {
    private int userId;
    private String name;
    private String email;
    private double balance;

    public User(int userId, String name, String email, double balance) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.balance = balance;
    }

    public synchronized void deposit(double amount) {
        balance += amount;
        System.out.println(name + " deposited " + amount + ". New Balance: " + balance);
    }

    public synchronized void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println(name + " withdrew " + amount + ". New Balance: " + balance);
        } else {
            System.out.println(name + " has insufficient balance to withdraw " + amount);
        }
    }

    public int getUserId() { return userId; }
    public double getBalance() { return balance; }
    public String getName() { return name; }

    public void displayInfo() {
        System.out.println("User ID: " + userId + ", Name: " + name + ", Email: " + email + ", Balance: " + balance);
    }
}

class Loan {
    private int loanId;
    private int userId;
    private String type;
    private double amount;

    public Loan(int loanId, int userId, String type, double amount) {
        this.loanId = loanId;
        this.userId = userId;
        this.type = type;
        this.amount = amount;
    }

    public void displayLoan() {
        System.out.println("Loan ID: " + loanId + ", Type: " + type + ", Amount: " + amount + ", User ID: " + userId);
    }
}

class Transaction implements Runnable {
    private static int count = 1;
    private int transactionId;
    private User user;
    private String type; // deposit or withdrawal
    private double amount;

    public Transaction(User user, String type, double amount) {
        this.transactionId = count++;
        this.user = user;
        this.type = type;
        this.amount = amount;
    }

    public void run() {
        if (type.equalsIgnoreCase("deposit")) {
            user.deposit(amount);
        } else if (type.equalsIgnoreCase("withdrawal")) {
            user.withdraw(amount);
        }
        displayTransaction();
    }

    public void displayTransaction() {
        System.out.println("Transaction ID: " + transactionId + ", Type: " + type +
                           ", Amount: " + amount + ", User: " + user.getName());
    }
}

class Branch {
    private int branchId;
    private String name;
    private List<User> users;

    public Branch(int branchId, String name) {
        this.branchId = branchId;
        this.name = name;
        this.users = new ArrayList<>();
    }

    public void addUser(User user) {
        users.add(user);
        System.out.println("User " + user.getName() + " added to branch " + name);
    }

    public void displayBranch() {
        System.out.println("Branch ID: " + branchId + ", Name: " + name);
        System.out.println("Users:");
        for (User user : users) {
            user.displayInfo();
        }
    }
}

// ==== Main Class ====
public class VirtualBankManagementSystem {

    public static void main(String[] args) {
        // Collections for storing data
        HashMap<Integer, User> userMap = new HashMap<>();
        List<Loan> loans = new ArrayList<>();
        List<Transaction> transactions = new ArrayList<>();
        List<Branch> branches = new ArrayList<>();

        // Sample Users
        User u1 = new User(1, "Alice", "alice@email.com", 10000);
        User u2 = new User(2, "Bob", "bob@email.com", 5000);
        userMap.put(u1.getUserId(), u1);
        userMap.put(u2.getUserId(), u2);

        // Sample Branch
        Branch b1 = new Branch(101, "Main Branch");
        b1.addUser(u1);
        b1.addUser(u2);
        branches.add(b1);

        // Sample Loans
        loans.add(new Loan(201, 1, "Home", 500000));
        loans.add(new Loan(202, 2, "Education", 200000));

        // Simulate Transactions using Threads
        Transaction t1 = new Transaction(u1, "deposit", 2000);
        Transaction t2 = new Transaction(u2, "withdrawal", 1000);
        Transaction t3 = new Transaction(u1, "withdrawal", 3000);
        transactions.add(t1);
        transactions.add(t2);
        transactions.add(t3);

        System.out.println("\n--- Starting Transactions (Multithreaded) ---\n");
        Thread th1 = new Thread(t1);
        Thread th2 = new Thread(t2);
        Thread th3 = new Thread(t3);

        th1.start();
        th2.start();
        th3.start();

        try {
            th1.join();
            th2.join();
            th3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n--- Final User Info ---");
        for (User user : userMap.values()) {
            user.displayInfo();
        }

        System.out.println("\n--- Loans ---");
        for (Loan loan : loans) {
            loan.displayLoan();
        }

        System.out.println("\n--- Branches ---");
        for (Branch branch : branches) {
            branch.displayBranch();
        }
    }
}
 